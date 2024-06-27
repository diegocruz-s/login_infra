import QueueBull, { Queue } from 'bull';
import { jobs } from '../../jobs/index';
import { ConfigRedis } from '../config/redis';

interface IQueue {
  bull: Queue;
  name: string;
  handle: (datas: any) => Promise<void>;
  options: object; 
};

class QueueController {
  private queues: IQueue[] = [];
  
  constructor () {
    this.createQueues();
  };

  createQueues () {
    jobs.map(job => {
      this.queues.push({
        name: job.key,
        options: job.options,
        handle: job.handle,
        bull: new QueueBull(job.key, { redis: ConfigRedis }),
      });
    });
  };

  add (name: string, data: unknown) {
    const queue = this.queues.find(queue => queue.name === name);
    
    return queue?.bull.add(data, queue.options);
  };

  process () {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', async (job) => {
        console.log('Job Failed', queue.name, job.name);
      });

      queue.bull.on('error', (error) => {
        console.error('Erro na fila:', error);
      });
    });
  };
};

const queueController = new QueueController();

export {
  queueController,
};