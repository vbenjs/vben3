import { toggleClass } from '@vben/utils';

/**
 * Change the status of the project's color weakness mode
 * @param colorWeak
 */
export function updateColorWeak(colorWeak: boolean) {
  toggleClass(colorWeak, 'color-weak', document.body);
}
