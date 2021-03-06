import {
  closeButton,
  presentButton,
  presentPrice0,
  presentPrice1500,
  presentPrice15000,
  presentPrice4000,
  presentPrice8000
} from '@/images';
import {
  clickImage,
  findImageInScreen,
  tryClickImage,
  tryFindImageInScreen
} from '@/utils/image';
import { wait } from '@/utils/wait';

const allPresentPriceImages: Image[] = [
  presentPrice0,
  presentPrice1500,
  presentPrice4000,
  presentPrice8000,
  presentPrice15000
];

export async function feedDragon(): Promise<void> {
  try {
    clickImage(presentButton);
  } catch {
    throw new Error('未找到礼物按钮, 请手动前往龙之庭院');
  }

  await wait(500);
  for (const i of allPresentPriceImages) {
    try {
      const pos: Point = findImageInScreen(i);
      swipe(pos.x, pos.y, pos.x, pos.y - 300, 300);
    } catch {
      break;
    }
  }

  let waitEndTime: number = new Date().getTime() + 20e3;
  let isCloseClicked: boolean = false;
  while (new Date().getTime() <= waitEndTime) {
    if (tryClickImage(closeButton)) {
      isCloseClicked = true;
      waitEndTime = new Date().getTime() + 2e3;
      await wait(500);
    } else {
      if (tryFindImageInScreen(presentButton)) {
        break;
      }
      await wait(1000);
    }
  }

  if (!isCloseClicked) {
    throw new Error('无可用礼物');
  }
}
