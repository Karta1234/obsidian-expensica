import type { Messages, PluralForms } from './en';

export const ru: Messages = {
  common: {
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Изменить',
    close: 'Закрыть',
  },
  settings: {
    language: {
      name: 'Язык',
      desc: 'Язык интерфейса. «Авто» следует языку приложения Obsidian.',
      auto: 'Авто',
    },
  },
  tx: {
    count: {
      one: '{count} транзакция',
      few: '{count} транзакции',
      many: '{count} транзакций',
    } as PluralForms,
  },
};
