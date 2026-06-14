// Источник истины для ключей i18n. Любой новый ключ добавляется сюда первым.
// Плюральные значения всегда имеют форму { one, few, many } во всех локалях.
// Формы основаны на CLDR-категориях множественного числа; в английском few/many
// намеренно совпадают (у языка нет отдельных форм), это не ошибка перевода.
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
    support: {
      title: 'Support & Resources',
      developer: 'Support the Developer',
      connect: 'Connect with Expensica',
      website: '🌐 Visit Expensica Website',
      linkedin: '💼 Follow on LinkedIn',
      issuesTitle: 'Report Issues & Request Features',
      issuesLink: '🐛 GitHub Issues & Feature Requests',
    },
    general: {
      title: 'General Settings',
    },
    currency: {
      name: 'Default Currency',
      desc: 'Select the currency to use for all transactions.',
      ariaLabel: 'Select calendar color scheme',
      searchPlaceholder: 'Search currencies...',
    },
    timeFormat: {
      name: 'Time Format',
      desc: 'Choose 12-hour or 24-hour time for chart hour labels.',
      h12: '12 hours',
      h24: '24 hours',
    },
    colorScheme: {
      name: 'Calendar Color Scheme',
      desc: 'Select the color scheme for the calendar visualization.',
      red: 'Red',
      blue: 'Blue',
      green: 'Green',
      purple: 'Purple',
      orange: 'Orange',
      teal: 'Teal',
      colorblind: 'Colorblind Friendly',
      custom: 'Custom',
    },
    weekNumbers: {
      name: 'Show Week Numbers',
      desc: 'Display week numbers in the calendar visualization.',
    },
    chartAxes: {
      name: 'Show Chart Axes',
      desc: 'Display chart axis lines and values in dashboard charts.',
    },
    chartGrid: {
      name: 'Show Chart Grid',
      desc: 'Display chart grid lines in dashboard charts.',
    },
    categoryLabels: {
      name: 'Show Transaction Category Labels',
      desc: 'Display colored category labels on transaction cards.',
    },
    accounts: {
      name: 'Enable Accounts',
      desc: 'Enable or disable account features.',
    },
    budgeting: {
      name: 'Enable Budgeting',
      desc: 'Enable or disable the budgeting features.',
    },
    dailyReview: {
      name: 'Enable Daily Finance Review (For Today)',
      desc: 'Enable or disable the ability to create daily finance reviews for today.',
    },
    dailyReviewAnyDate: {
      name: 'Enable Daily Finance Review for Any Date',
      desc: 'Enable or disable the ability to create/update daily finance reviews for any date.',
    },
    dailyReviewFolder: {
      name: 'Daily Finance Review Folder',
      desc: 'Select a folder where all daily finance review notes will be stored.',
      placeholder: 'Example: Daily Finance Reviews',
      browse: 'Browse',
    },
    data: {
      title: 'Data Management',
      exportName: 'Export data',
      exportDesc: 'Export your transactions with advanced filtering options',
      exportButton: 'Export Transactions',
      importName: 'Import data',
      importDesc: 'Import transactions from a JSON file',
      importButton: 'Import',
    },
  },
  account: {
    runningBalance: 'Running Balance',
  },
  errors: {
    accountExists: 'Account already exists',
    accountNotFound: 'Account not found',
    defaultAccountCannotBeCredit: 'Default account cannot be credit',
    categoryExists: 'Category already exists',
    categoryNameReserved: 'Category name "{name}" is reserved',
  },
  commands: {
    addExpense: 'Add New Expense',
    addIncome: 'Add New Income',
    openDashboard: 'Open Dashboard',
    viewTransactions: 'View All Transactions',
    openBudget: 'Open Budget',
    exportTransactions: 'Export Transactions',
    createReviewToday: 'Create Daily Finance Review (For Today)',
    createReviewAnyDate: 'Create/Update Daily Finance Review for Any Date',
  },
  notice: {
    reviewTodayDisabled: 'Daily Finance Review feature is disabled. Please enable it in settings.',
    reviewAnyDateDisabled: 'Daily Finance Review for Any Date feature is disabled. Please enable it in settings.',
    loadTransactionsError: 'Error loading transactions data. Using default data.',
    saveTransactionsError: 'Failed to save transactions data',
    loadAccountsError: 'Error loading accounts data. Using default data.',
    saveAccountsError: 'Failed to save accounts data',
    loadBudgetError: 'Error loading budget data. Using default data.',
    saveBudgetError: 'Error saving budget data. See console for details.',
    exportSuccess: 'Transactions exported successfully',
    exportError: 'Error exporting transactions',
    importSuccess: 'Imported {count} transactions successfully',
    importInvalidFormat: 'Invalid file format for import',
    importError: 'Error importing transactions',
    reviewCreateFailed: 'Failed to create daily finance review',
    noteUpdated: 'Updated note: {title}',
    noteCreated: 'Created note: {title}',
    fileNotFound: 'File not found: {path}',
    enterFilePath: 'Please enter a file path',
    folderCreated: 'Created folder: {name}',
    folderCreateError: 'Error creating folder: {message}',
    enterFolderName: 'Please enter a folder name',
  },
  modals: {
    deleteCategoryTitle: 'Delete Category?',
    deleteCategoryMessage: 'Are you sure you want to delete the "{name}" category? This action cannot be undone.',
    import: {
      title: 'Import Transactions',
      prompt: 'Enter the path to the JSON file to import:',
      pathPlaceholder: 'expensica-data/file-to-import.json',
      cancel: 'Cancel',
      import: 'Import',
    },
    folder: {
      title: 'Select Folder for Daily Reviews',
      prompt: 'Choose where to store your daily finance review notes:',
      rootFolder: 'Root folder',
      createNew: '+ Create new folder',
      namePlaceholder: 'Enter folder name',
      cancel: 'Cancel',
      create: 'Create',
    },
    datePicker: {
      title: 'Select Date for Daily Review',
      submit: 'Create Review',
    },
  },
  review: {
    generatedBy: 'This note was automatically generated by Expensica on {datetime}',
    titlePrefix: 'Daily Finance Review',
    dailySummary: '📊 Daily Summary',
    noTransactionsToday: 'No transactions recorded today.',
    noTransactionsDate: 'No transactions recorded for this date.',
    todaysSnapshot: "Today's Snapshot:",
    dailySnapshot: 'Daily Snapshot:',
    income: 'Income',
    expenses: 'Expenses',
    netBalance: 'Net Balance',
    numberOfTransactions: 'Number of Transactions',
    comparedToYesterday: 'Compared to Yesterday:',
    youSpent: 'You spent {change}',
    spentMore: '{amount} more than yesterday ({percent}% increase)',
    spentLess: '{amount} less than yesterday ({percent}% decrease)',
    spentSame: 'the same as yesterday',
    todaysTransactions: "📝 Today's Transactions",
    transactions: '📝 Transactions',
    tableDescription: 'Description',
    tableCategory: 'Category',
    tableAmount: 'Amount',
    tableNotes: 'Notes',
    otherExpenses: 'Other Expenses',
    todaysBreakdown: "📊 Today's Spending Breakdown",
    breakdown: '📊 Spending Breakdown',
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
