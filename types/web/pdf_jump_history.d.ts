export type EventBus = import("./event_utils").EventBus;
export type PDFViewer = import("./pdf_viewer").PDFViewer;
export type ViewHistory = import("./view_history").ViewHistory;
/**
 * Two independent ways of getting back to a reading position:
 *
 *  - Marks, set explicitly with `M` or from the floating toolbar shown when
 *    selecting text. Marked lines are highlighted on their page, and can be
 *    listed (to jump directly to any of them, or save them to a JSON file) and
 *    cycled through with `C` and `Shift+C`, wrapping around at either end.
 *    Nothing else ever adds to, or changes, the marks.
 *
 *  - A single return point, remembered when following a link, an outline
 *    item, a thumbnail or typing a page number. `B` (or the floating button)
 *    goes back to where that navigation started; pressing it again goes back
 *    to where it was pressed, i.e. it toggles between both places.
 *
 * The line of the position being gone to is briefly flashed.
 *
 * Unlike `PDFHistory` this is independent of the browser history.
 */
export class PDFJumpHistory {
    /**
     * @param {object} options - The DOM elements of the floating buttons.
     * @param {HTMLDivElement} options.container
     * @param {HTMLButtonElement} options.backButton
     * @param {HTMLButtonElement} options.listButton
     * @param {HTMLDivElement} options.panel
     * @param {HTMLOListElement} options.entries
     * @param {HTMLButtonElement} options.saveButton
     * @param {HTMLSelectElement} options.maxEntriesSelect
     * @param {HTMLButtonElement} options.clearButton
     * @param {EventBus} eventBus - The application event bus.
     * @param {PDFViewer} pdfViewer - The PDF viewer.
     */
    constructor({ container, backButton, listButton, panel, entries, saveButton, maxEntriesSelect, clearButton, }: {
        container: HTMLDivElement;
        backButton: HTMLButtonElement;
        listButton: HTMLButtonElement;
        panel: HTMLDivElement;
        entries: HTMLOListElement;
        saveButton: HTMLButtonElement;
        maxEntriesSelect: HTMLSelectElement;
        clearButton: HTMLButtonElement;
    }, eventBus: EventBus, pdfViewer: PDFViewer);
    container: HTMLDivElement;
    backButton: HTMLButtonElement;
    listButton: HTMLButtonElement;
    panel: HTMLDivElement;
    entries: HTMLOListElement;
    eventBus: import("./event_utils").EventBus;
    pdfViewer: import("./pdf_viewer").PDFViewer;
    clearButton: HTMLButtonElement;
    /**
     * Start tracking positions, once the initial view of the document is set.
     * @param {ViewHistory|null} store - Used to persist the marks per file.
     * @param {string} filename - Used to name the file the marks are saved to.
     */
    initialize(store: ViewHistory | null, filename: string): Promise<void>;
    reset(): void;
    get canReturn(): boolean;
    get hasMarks(): boolean;
    get maxEntries(): number;
    /**
     * Change how many marks are remembered, dropping the oldest ones when there
     * are now too many.
     * @param {number} value
     */
    setMaxEntries(value: number): void;
    get isPanelOpen(): boolean;
    /**
     * Go back to where the last navigation (link, outline, ...) started; doing
     * it again returns to where this was done.
     */
    toggleReturn(): void;
    /**
     * Go to the previous (older) mark, or wrap around to the newest one.
     */
    cycleBack(): void;
    /**
     * Go to the next (newer) mark, or wrap around to the oldest one.
     */
    cycleForward(): void;
    togglePanel(): void;
    openPanel(): void;
    closePanel(): void;
    /**
     * Download all the marks, oldest first, as a JSON file.
     */
    saveToFile(): void;
    /**
     * Mark the position at the top of the view.
     */
    markCurrentPosition(): void;
    /**
     * Mark the line at the given height of a page.
     * @param {number} pageNumber
     * @param {number} top - The top of the line, in PDF units.
     * @param {number} textTop - Somewhere within the line (e.g. its middle),
     *   which must be above its baseline, in PDF units.
     * @param {number} [textLeft] - A horizontal position within the line, in
     *   PDF units; used to find the right column in multi-column layouts.
     */
    markAt(pageNumber: number, top: number, textTop: number, textLeft?: number): void;
    /**
     * Mark the line of the selected text, from the floating toolbar shown when
     * selecting text.
     */
    markSelection(): void;
    /**
     * Remove all the marks of the document.
     */
    clearAll(): void;
    #private;
}
