// Источник истины для ключей i18n. Любой новый ключ добавляется сюда первым.
// Плюральные значения всегда имеют форму { one, few, many } во всех локалях.
export interface PluralForms {
  one: string;
  few: string;
  many: string;
}

export const en = {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
  },
  settings: {
    language: {
      name: 'Language',
      desc: 'Interface language. "Auto" follows the Obsidian app language.',
      auto: 'Auto',
    },
  },
  tx: {
    count: {
      one: '{count} transaction',
      few: '{count} transactions',
      many: '{count} transactions',
    } as PluralForms,
  },
};

export type Messages = typeof en;
