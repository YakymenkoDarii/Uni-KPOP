import { UkPaginatorIntl } from './paginator-intl';

describe('UkPaginatorIntl', () => {
  const intl = new UkPaginatorIntl();

  it('повинен мати українські підписи', () => {
    expect(intl.itemsPerPageLabel).toBe('Рядків на сторінці:');
    expect(intl.nextPageLabel).toMatch(/Наступна/);
  });

  it('повинен сформувати діапазон для першої сторінки', () => {
    expect(intl.getRangeLabel(0, 10, 50)).toBe('1 – 10 з 50');
  });

  it('повинен обрізати діапазон на останній неповній сторінці', () => {
    expect(intl.getRangeLabel(4, 10, 45)).toBe('41 – 45 з 45');
  });

  it('повинен повернути «0 з 0» для порожнього списку', () => {
    expect(intl.getRangeLabel(0, 10, 0)).toBe('0 з 0');
  });
});
