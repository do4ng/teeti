export type Alignment = 'left' | 'center' | 'right';

export interface BoxStyle {
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface Options {
  title?: string;
  titlePadding?: number;

  textAlign?: Alignment;
  titleAlign?: Alignment;

  marginLeft?: number;
  padding?: number;
  paddingTopBottom?: number;
  paddingLeftRight?: number;
  style?: BoxStyle;

  minWidth?: number;
}

export const DEFAULT_THEME: BoxStyle;

/**
 * ```js
 * boxArray("Hello World")
 * // => [ '┌───────────┐', '│Hello World│', '└───────────┘' ]
 * ```
 */
export function boxArray(input: string, options?: Options): string[];

/**
 * ```js
 * box("Hello World")
 * // == boxArray("Hello World").join("\n")
 * ```
 */
export function box(input: string, options?: Options): string;
