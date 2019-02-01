import { store } from '@/store';
import { taskRegistry } from '@/task-registry';

export function runTaskForever(): void {
  if (store.currentTask === undefined) {
    sleep(1000);
  } else {
    const taskName: string = store.currentTask;
    const handler: (() => void) | undefined = taskRegistry[taskName];
    if (!handler) {
      throw new Error(`Unknown task: ${taskName}`);
    }
    console.log(`运行任务: ${taskName}`);
    handler();
  }
  runTaskForever();
}