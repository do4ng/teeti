import StringWidth from 'string-width';

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

  displayCenter?: boolean;

  minWidth?: number;
}

export const DEFAULT_THEME: BoxStyle = {
  topLeft: '┌',
  topRight: '┐',
  bottomLeft: '└',
  bottomRight: '┘',
  top: '─',
  bottom: '─',
  left: '│',
  right: '│',
};

function getMaxWidth(lines: string[]) {
  let max = 0;

  lines.forEach((line) => {
    const width = StringWidth(line);

    if (width > max) {
      max = width;
    }
  });

  return max;
}

function getStyle(opt?: Options) {
  return { ...DEFAULT_THEME, ...(opt?.style || {}) };
}

export function boxArray(input: string, options?: Options): string[] {
  const style = getStyle(options);
  const paddingTB = options?.padding || options?.paddingTopBottom || 0; // top, bottom padding
  const paddingLR = options?.padding || options?.paddingLeftRight || 0; // left, right padding

  const title = options?.title || '';
  const titlePadding = options?.titlePadding || 0;

  const lines = input.split('\n');
  const maxWidth = Math.max((options?.minWidth || 0) - 2, getMaxWidth(lines));
  const boxWidth = maxWidth + paddingLR * 2;

  if (!options) options = {};

  if (options?.displayCenter) {
    options.marginLeft =
      (process.stdout.columns - boxWidth - StringWidth(style.topLeft + style.topRight)) /
      2;
  }

  const output: string[] = [];

  lines.forEach((line) => {
    const lineWidth = StringWidth(line);

    let leftSpaces: string = '';
    let rightSpaces: string = '';

    switch (options?.textAlign || 'left') {
      case 'left':
        leftSpaces = ' '.repeat(paddingLR);
        rightSpaces = ' '.repeat(maxWidth - lineWidth + paddingLR);
        break;

      case 'center':
        leftSpaces = ' '.repeat(Math.floor((maxWidth - lineWidth) / 2 + paddingLR));
        rightSpaces = ' '.repeat(boxWidth - leftSpaces.length - lineWidth);
        // console.log(maxWidth, lineWidth, leftSpaces.length, rightSpaces.length);
        break;

      case 'right':
        leftSpaces = ' '.repeat(maxWidth - lineWidth + paddingLR);
        rightSpaces = ' '.repeat(paddingLR);
        break;

      default:
        break;
    }

    output.push(`${leftSpaces}${line}${rightSpaces}`);

    // console.log(StringWidth(`${leftSpaces}${line}${rightSpaces}`), boxWidth);
  });

  const titlePaddingSpace = ' '.repeat(titlePadding);
  let start: string = '';

  switch (options?.titleAlign || 'center') {
    case 'left':
      start =
        style.topLeft +
        titlePaddingSpace +
        title +
        titlePaddingSpace +
        style.top.repeat(boxWidth - StringWidth(title) - titlePadding * 2) +
        style.topRight;
      break;

    case 'center':
      start =
        style.topLeft +
        style.top.repeat((boxWidth - StringWidth(title)) / 2 - titlePadding) +
        titlePaddingSpace +
        title +
        titlePaddingSpace +
        style.top.repeat(
          boxWidth -
            StringWidth(title) -
            StringWidth(style.top.repeat((boxWidth - StringWidth(title)) / 2)) -
            titlePadding
        ) +
        style.topRight;
      break;

    case 'right':
      start =
        style.topLeft +
        style.top.repeat(boxWidth - StringWidth(title) - titlePadding * 2) +
        titlePaddingSpace +
        title +
        titlePaddingSpace +
        style.topRight;
      break;

    default:
      break;
  }

  const end = style.bottomLeft + style.bottom.repeat(boxWidth) + style.bottomRight;

  // console.log(StringWidth(start));

  const paddingLines = [];

  for (let index = 0; index < paddingTB; index += 1) {
    paddingLines.push(' '.repeat(boxWidth));
  }

  const result = [...paddingLines, ...output, ...paddingLines];

  return [start, ...result.map((o) => `${style.left}${o}${style.right}`), end].map(
    (l) => `${' '.repeat(options?.marginLeft || 0)}${l}`
  );
}

export function box(input: string, options?: Options) {
  return boxArray(input, options).join('\n');
}
