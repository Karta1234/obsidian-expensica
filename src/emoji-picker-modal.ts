import { App, Modal } from 'obsidian';
import { Category, getCommonCategoryEmojis } from './models';
import { t } from './i18n';

export class EmojiPickerModal extends Modal {
    category: Category;
    currentEmoji: string;
    onConfirm: (emoji: string) => void;

    constructor(app: App, category: Category, currentEmoji: string, onConfirm: (emoji: string) => void) {
        super(app);
        this.category = category;
        this.currentEmoji = currentEmoji;
        this.onConfirm = onConfirm;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.addClass('expensica-modal');
        contentEl.addClass('expensica-emoji-picker-modal');

        const form = contentEl.createDiv('emoji-picker-form');

        const emojiInput = form.createEl('input', {
            attr: {
                type: 'text',
                value: this.currentEmoji,
                placeholder: t('category.emojiPlaceholder')
            },
            cls: 'emoji-input'
        });

        const commonEmojis = form.createDiv('common-emojis');
        commonEmojis.createEl('p', { text: t('category.commonEmojis') });

        const emojis = getCommonCategoryEmojis(this.category.type);

        const emojiGrid = commonEmojis.createDiv('emoji-grid');

        emojis.forEach(emoji => {
            const emojiButton = emojiGrid.createEl('button', {
                text: emoji,
                cls: 'emoji-button'
            });

            emojiButton.addEventListener('click', () => {
                emojiInput.value = emoji;
            });
        });

        const buttonContainer = form.createDiv('button-container');

        const cancelButton = buttonContainer.createEl('button', {
            text: t('common.cancel'),
            cls: 'expensica-btn expensica-btn-secondary'
        });

        const saveButton = buttonContainer.createEl('button', {
            text: t('common.save'),
            cls: 'expensica-btn expensica-btn-primary'
        });

        cancelButton.addEventListener('click', () => {
            this.close();
        });

        saveButton.addEventListener('click', () => {
            const nextEmoji = emojiInput.value || this.currentEmoji;
            if (nextEmoji !== this.currentEmoji) {
                this.onConfirm(nextEmoji);
            }
            this.close();
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
