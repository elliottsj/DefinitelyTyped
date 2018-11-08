// Type definitions for slate-react 0.20
// Project: https://github.com/ianstormtaylor/slate
// Definitions by: Andy Kent <https://github.com/andykent>
//                 Jamie Talbot <https://github.com/majelbstoat>
//                 Jan Löbel <https://github.com/JanLoebel>
//                 Patrick Sachs <https://github.com/PatrickSachs>
//                 Brandon Shelton <https://github.com/YangusKhan>
//                 Irwan Fario Subastian <https://github.com/isubasti>
//                 Sebastian Greaves <https://github.com/sgreav>
//                 Francesco Agnoletto <https://github.com/Kornil>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8
import {
    Document,
    Editor as Controller,
    Mark,
    Node,
    Block,
    Inline,
    Operations,
    Schema,
    Stack,
    Value,
    Operation,
} from "slate";
import * as Immutable from "immutable";
import * as React from "react";

// Values prefixed with "data-..." (Used for spellchecking according to docs)
export interface RenderAttributes {
    [key: string]: any;
}

export interface RenderMarkProps {
    attributes: RenderAttributes;
    children: React.ReactNode;
    editor: Controller;
    mark: Mark;
    marks: Immutable.Set<Mark>;
    node: Node;
    offset: number;
    text: string;
}

export interface RenderNodeProps {
  attributes: RenderAttributes;
  children: React.ReactNode;
  editor: Controller;
  isFocused: boolean;
  isSelected: boolean;
  key: string;
  node: Block | Inline;
  parent: Node;
  readOnly: boolean;
}

export interface RenderPlaceholderProps {
    editor: Controller;
    readOnly: boolean;
}

export type EventHook = (
    event: Event,
    editor: Controller,
    next: () => any
) => any;

export interface Plugin {
    decorateNode?: (node: Node, editor: Controller, next: () => any) => any;
    renderEditor?: (props: EditorProps, editor: Controller, next: () => any) => any;
    renderMark?: (props: RenderMarkProps, editor: Controller, next: () => any) => any;
    renderNode?: (props: RenderNodeProps, editor: Controller, next: () => any) => any;
    renderPlaceholder?: (props: RenderPlaceholderProps, editor: Controller, next: () => any) => any;
    shouldNodeComponentUpdate?: (previousProps: RenderNodeProps, props: RenderNodeProps, editor: Controller, next: () => any) => any;

    onBeforeInput?: EventHook;
    onBlur?: EventHook;
    onClick?: EventHook;
    onCompositionEnd?: EventHook;
    onCompositionStart?: EventHook;
    onCopy?: EventHook;
    onCut?: EventHook;
    onDragEnd?: EventHook;
    onDragEnter?: EventHook;
    onDragExit?: EventHook;
    onDragLeave?: EventHook;
    onDragOver?: EventHook;
    onDragStart?: EventHook;
    onDrop?: EventHook;
    onFocus?: EventHook;
    onInput?: EventHook;
    onKeyDown?: EventHook;
    onPaste?: EventHook;
    onSelect?: EventHook;
}

export interface BasicEditorProps {
    value: Value;
    autoCorrect?: boolean;
    autoFocus?: boolean;
    className?: string;
    onChange?: (change: { operations: Immutable.List<Operation>, value: Value }) => any;
    placeholder?: any;
    plugins?: Plugin[];
    readOnly?: boolean;
    role?: string;
    schema?: Schema;
    spellCheck?: boolean;
    style?: React.CSSProperties;
    tabIndex?: number;
}

export type EditorProps = BasicEditorProps & Plugin;

export interface EditorState {
    schema: Schema;
    value: Value;
    stack: Stack;
}

export class Editor extends React.Component<EditorProps, EditorState> {
    controller: Controller;

    // Instance methods
    resolveController(plugins: Plugin[], schema: Schema, commands: any[], queries: any[]): void;

    /**
     * Mimic the API of the `Editor` controller, so that this component instance
     * can be passed in its place to plugins.
     */

    // Properties
    readonly operations: Immutable.List<Operation>;
    readonly readOnly: boolean;
    readonly value: Value;

    /**
     * @deprecated
     */
    schema: Schema;
    /**
     * @deprecated
     */
    stack: Stack;

    // Instance methods
    applyOperation: Controller['applyOperation'];
    command: Controller['command'];
    query: Controller['query'];
    registerCommand: Controller['registerCommand'];
    registerQuery: Controller['registerQuery'];
    run: Controller['run'];

    /**
     * @deprecated
     */
    onChange: Controller['onChange'];

    // Built in Command Operations //

    // Current Selection Commands //
    /**
     * Add a mark to the characters in the current selection
     */
    addMark: Controller['addMark'];

    /**
     * Delete everything in the current selection.
     */
    delete: Controller['delete'];

    /**
     * Delete backward n characters at the current cursor.
     * If the selection is expanded, behaviour is equivalent to delete()
     */
    deleteBackward: Controller['deleteBackward'];

    /**
     * Delete backward n characters at the current cursor.
     * If the selection is expanded, behaviour is equivalent to delete()
     */
    deleteForward: Controller['deleteForward'];

    /**
     * Insert a new block at the same level as the current block, splitting the current block to make room if it is non-empty.
     * If the selection is expanded, it will be deleted first.
     */
    insertBlock: Controller['insertBlock'];

    /**
     * Insert a document fragment at the current selection. If the selection is expanded, it will be deleted first.
     */
    insertFragment: Controller['insertFragment'];

    /**
     * Insert a new inline at the current cursor position, splitting the text to make room if it is non-empty.
     * If the selection is expanded, it will be deleted first.
     */
    insertInline: Controller['insertInline'];

    /**
     * Insert a string of text at the current selection. If the selection is expanded, it will be deleted first
     */
    insertText: Controller['insertText'];

    /**
     * Set the properties of the Blocks in the current selection.
     * Passing a string will set the blocks' type only.
     */
    setBlocks: Controller['setBlocks'];

    /**
     * Set the properties of the Inlines nodes in the current selection.
     * Passing a string will set the nodes' type only.
     */
    setInlines: Controller['setInlines'];

    /**
     * Split the Block in the current selection by depth levels.
     * If the selection is expanded, it will be deleted first.
     */
    splitBlock: Controller['splitBlock'];

    /**
     * Split the Inline node in the current selection by depth levels.
     * If the selection is expanded, it will be deleted first
     */
    splitInline: Controller['splitInline'];

    /**
     * Remove a mark from the characters in the current selection.
     * Passing a string will implicitly create a Mark of that type for removal.
     */
    removeMark: Controller['removeMark'];

    /**
     * Remove a mark from the characters in the current selection.
     * Passing a string will implicitly create a Mark of that type.
     */
    replaceMark: Controller['replaceMark'];

    /**
     * Add or remove a mark from the characters in the current selection, depending on it already exists on any or not.
     * Passing a string will implicitly create a Mark of that type to toggle.
     */
    toggleMark: Controller['toggleMark'];

    /**
     * Unwrap all Block nodes in the current selection that match a type and/or data
     */
    unwrapBlock: Controller['unwrapBlock'];

    /**
     * Unwrap all Inline nodes in the current selection that match a type and/or data
     */
    unwrapInline: Controller['unwrapInline'];

    /**
     * Wrap the Block nodes in the current selection with a new Block
     */
    wrapBlock: Controller['wrapBlock'];

    /**
     *  Wrap the Block nodes in the current selection with a new Inline
     */
    wrapInline: Controller['wrapInline'];

    /**
     * Surround the text in the current selection with prefix and suffix strings.
     * If the suffix is ommitted, the prefix will be used instead.
     */
    wrapText: Controller['wrapText'];

    // Selection Commands //
    /**
     * Blur the current selection
     */
    blur: Controller['blur'];

    /**
     * Unset the selection
     */
    deselect: Controller['deselect'];

    /**
     * Flip the selection
     */
    flip: Controller['flip'];

    /**
     * Focus the current selection
     */
    focus: Controller['focus'];

    /**
     * Move the anchor of the current selection backward n characters
     */
    moveAnchorBackward: Controller['moveAnchorBackward'];
    /**
     * Move the anchor of the current selection forward n characters
     */
    moveAnchorForward: Controller['moveAnchorForward'];
    /**
     * Move the anchor of the current selection to a new path and offset
     */
    moveAnchorTo: Controller['moveAnchorTo'];
    /**
     * Move the anchor of the current selection to the end of the closest block parent.
     */
    moveAnchorToEndOfBlock: Controller['moveAnchorToEndOfBlock'];
    /**
     * Move the anchor of the current selection to the end of the closest inline parent.
     */
    moveAnchorToEndOfInline: Controller['moveAnchorToEndOfInline'];
    /**
     * Move the anchor of the current selection to the end of the document.
     */
    moveAnchorToEndOfDocument: Controller['moveAnchorToEndOfDocument'];
    /**
     * Move the anchor of the current selection to the end of the next block.
     */
    moveAnchorToEndOfNextBlock: Controller['moveAnchorToEndOfNextBlock'];
    /**
     * Move the anchor of the current selection to the end of the next inline.
     */
    moveAnchorToEndOfNextInline: Controller['moveAnchorToEndOfNextInline'];
    /**
     * Move the anchor of the current selection to the end of the next text.
     */
    moveAnchorToEndOfNextText: Controller['moveAnchorToEndOfNextText'];
    /**
     * Move the anchor of the current selection to the end of the provided node.
     */
    moveAnchorEndOfNode: Controller['moveAnchorEndOfNode'];
    /**
     * Move the anchor of the current selection to the end of the previous block.
     */
    moveAnchorToEndOfPreviousBlock: Controller['moveAnchorToEndOfPreviousBlock'];
    /**
     * Move the anchor of the current selection to the end of the previous inline.
     */
    moveAnchorToEndOfPreviousInline: Controller['moveAnchorToEndOfPreviousInline'];
    /**
     * Move the anchor of the current selection to the end of the previous text.
     */
    moveAnchorToEndOfPreviousText: Controller['moveAnchorToEndOfPreviousText'];
    /**
     * Move the anchor of the current selection to the end of the current text node.
     */
    moveAnchorToEndOfText: Controller['moveAnchorToEndOfText'];
    /**
     * Move the anchor of the current selection to the start of the closest block parent.
     */
    moveAnchorToStartOfBlock: Controller['moveAnchorToStartOfBlock'];
    /**
     * Move the anchor of the current selection to the start of the document.
     */
    moveAnchorToStartOfDocument: Controller['moveAnchorToStartOfDocument'];
    /**
     * Move the anchor of the current selection to the start of the closest inline parent.
     */
    moveAnchorToStartOfInline: Controller['moveAnchorToStartOfInline'];
    /**
     * Move the anchor of the current selection to the start of the next block.
     */
    moveAnchorToStartOfNextBlock: Controller['moveAnchorToStartOfNextBlock'];
    /**
     * Move the anchor of the current selection to the start of the next inline.
     */
    moveAnchorToStartOfNextInline: Controller['moveAnchorToStartOfNextInline'];
    /**
     * Move the anchor of the current selection to the start of the next text node.
     */
    moveAnchorToStartOfNextText: Controller['moveAnchorToStartOfNextText'];
    /**
     * Move the anchor of the current selection to the start of the provided node.
     */
    moveAnchorToStartOfNode: Controller['moveAnchorToStartOfNode'];
    /**
     * Move the anchor of the current selection to the start of the previous block.
     */
    moveAnchorToStartOfPreviousBlock: Controller['moveAnchorToStartOfPreviousBlock'];
    /**
     * Move the anchor of the current selection to the start of the previous inline.
     */
    moveAnchorToStartOfPreviousInline: Controller['moveAnchorToStartOfPreviousInline'];
    /**
     * Move the anchor of the current selection to the start of the previous text node.
     */
    moveAnchorToStartOfPreviousText: Controller['moveAnchorToStartOfPreviousText'];
    /**
     * Move the anchor of the current selection to the start of the current text node.
     */
    moveAnchorToStartOfText: Controller['moveAnchorToStartOfText'];

    /**
     * Move the end of the selection backward n characters
     */
    moveEndBackward: Controller['moveEndBackward'];
    /**
     * Move the end of the selection foward n characters
     */
    moveEndForward: Controller['moveEndForward'];

    /**
     * Move the end of the selection to a new path and offset
     */
    moveEndTo: Controller['moveEndTo'];
    /**
     * Move the end of the current selection to the end of the closest block parent.
     */
    moveEndToEndOfBlock: Controller['moveEndToEndOfBlock'];
    /**
     * Move the end of the current selection to the end of the document.
     */
    moveEndToEndOfDocument: Controller['moveEndToEndOfDocument'];
    /**
     * Move the end of the current selection to the end of the closest inline parent.
     */
    moveEndToEndOfInline: Controller['moveEndToEndOfInline'];
    /**
     * Move the anchor of the current selection to the end of the next block.
     */
    moveEndToEndOfNextBlock: Controller['moveEndToEndOfNextBlock'];
    /**
     * Move the end of the current selection to the end of the next inline.
     */
    moveEndToEndOfNextInline: Controller['moveEndToEndOfNextInline'];
    /**
     * Move the end of the current selection to the end of the next text.
     */
    moveEndToEndOfNextText: Controller['moveEndToEndOfNextText'];
    /**
     * Move the end of the current selection to the end of the provided node.
     */
    moveEndToEndOfNode: Controller['moveEndToEndOfNode'];
    /**
     * Move the end of the current selection to the end of the previous block.
     */
    moveEndToEndOfPreviousBlock: Controller['moveEndToEndOfPreviousBlock'];
    /**
     * Move the end of the current selection to the end of the previous inline.
     */
    moveEndToEndOfPreviousInline: Controller['moveEndToEndOfPreviousInline'];
    /**
     * Move the editor of the current selection to the end of the previous text.
     */
    moveEndToEndOfPreviousText: Controller['moveEndToEndOfPreviousText'];
    /**
     * Move the end of the current selection to the end of the current text node.
     */
    moveEndToEndOfText: Controller['moveEndToEndOfText'];
    /**
     * Move the end of the current selection to the start of the closest block parent.
     */
    moveEndToStartOfBlock: Controller['moveEndToStartOfBlock'];
    /**
     * Move the end of the current selection to the start of the document.
     */
    moveEndToStartOfDocument: Controller['moveEndToStartOfDocument'];
    /**
     * Move the end of the current selection to the start of the closest inline parent.
     */
    moveEndToStartOfInline: Controller['moveEndToStartOfInline'];
    /**
     * Move the end of the current selection to the start of the next block.
     */
    moveEndToStartOfNextBlock: Controller['moveEndToStartOfNextBlock'];
    /**
     * Move the end of the current selection to the start of the next inline.
     */
    moveEndToStartOfNextInline: Controller['moveEndToStartOfNextInline'];
    /**
     * Move the end of the current selection to the start of the next text node.
     */
    moveEndToStartOfNextText: Controller['moveEndToStartOfNextText'];
    /**
     * Move the end of the current selection to the start of the provided node.
     */
    moveEndToStartOfNode: Controller['moveEndToStartOfNode'];
    /**
     * Move the end of the current selection to the start of the previous block.
     */
    moveEndToStartOfPreviousBlock: Controller['moveEndToStartOfPreviousBlock'];
    /**
     * Move the end of the current selection to the start of the previous inline.
     */
    moveEndToStartOfPreviousInline: Controller['moveEndToStartOfPreviousInline'];
    /**
     * Move the end of the current selection to the start of the previous text node.
     */
    moveEndToStartOfPreviousText: Controller['moveEndToStartOfPreviousText'];
    /**
     * Move the end of the current selection to the start of the current text node.
     */
    moveEndToStartOfText: Controller['moveEndToStartOfText'];

    /**
     * Move the focus of the current selection backward n characters
     */
    moveFocusBackward: Controller['moveFocusBackward'];
    /**
     * Move the focus of the current selection forward n characters
     */
    moveFocusForward: Controller['moveFocusForward'];
    /**
     * Move the focus of the current selection to a new path and offset
     */
    moveFocusTo: Controller['moveFocusTo'];
    /**
     * Move the focus of the current selection to the end of the closest block parent.
     */
    moveFocusToEndOfBlock: Controller['moveFocusToEndOfBlock'];
    /**
     * Move the focus of the current selection to the end of the document.
     */
    moveFocusToEndOfDocument: Controller['moveFocusToEndOfDocument'];
    /**
     * Move the focus of the current selection to the end of the closest inline parent.
     */
    moveFocusToEndOfInline: Controller['moveFocusToEndOfInline'];
    /**
     * Move the focus of the current selection to the end of the next block.
     */
    moveFocusToEndOfNextBlock: Controller['moveFocusToEndOfNextBlock'];
    /**
     * Move the focus of the current selection to the end of the next inline.
     */
    moveFocusToEndOfNextInline: Controller['moveFocusToEndOfNextInline'];
    /**
     * Move the focus of the current selection to the end of the next text.
     */
    moveFocusToEndOfNextText: Controller['moveFocusToEndOfNextText'];
    /**
     * Move the focus of the current selection to the end of the provided node.
     */
    moveFocusToEndOfNode: Controller['moveFocusToEndOfNode'];
    /**
     * Move the focus of the current selection to the end of the previous block.
     */
    moveFocusToEndOfPreviousBlock: Controller['moveFocusToEndOfPreviousBlock'];
    /**
     * Move the focus of the current selection to the end of the previous inline.
     */
    moveFocusToEndOfPreviousInline: Controller['moveFocusToEndOfPreviousInline'];
    /**
     * Move the focus of the current selection to the end of the previous text.
     */
    moveFocusToEndOfPreviousText: Controller['moveFocusToEndOfPreviousText'];
    /**
     * Move the focus of the current selection to the end of the current text node.
     */
    moveFocusToEndOfText: Controller['moveFocusToEndOfText'];
    /**
     * Move the focus of the current selection to the start of the closest block parent.
     */
    moveFocusToStartOfBlock: Controller['moveFocusToStartOfBlock'];
    /**
     * Move the focus of the current selection to the start of the document.
     */
    moveFocusToStartOfDocument: Controller['moveFocusToStartOfDocument'];
    /**
     * Move the focus of the current selection to the start of the closest inline parent.
     */
    moveFocusToStartOfInline: Controller['moveFocusToStartOfInline'];
    /**
     * Move the focus of the current selection to the start of the next block.
     */
    moveFocusToStartOfNextBlock: Controller['moveFocusToStartOfNextBlock'];
    /**
     * Move the focus of the current selection to the start of the next inline.
     */
    moveFocusToStartOfNextInline: Controller['moveFocusToStartOfNextInline'];
    /**
     * Move the focus of the current selection to the start of the next text node.
     */
    moveFocusToStartOfNextText: Controller['moveFocusToStartOfNextText'];
    /**
     * Move the focus of the current selection to the start of the provided node.
     */
    moveFocusToStartOfNode: Controller['moveFocusToStartOfNode'];
    /**
     * Move the focus of the current selection to the start of the previous block.
     */
    moveFocusToStartOfPreviousBlock: Controller['moveFocusToStartOfPreviousBlock'];
    /**
     * Move the focus of the current selection to the start of the previous inline.
     */
    moveFocusToStartOfPreviousInline: Controller['moveFocusToStartOfPreviousInline'];
    /**
     * Move the focus of the current selection to the start of the previous text node.
     */
    moveFocusToStartOfPreviousText: Controller['moveFocusToStartOfPreviousText'];
    /**
     * Move the focus of the current selection to the start of the current text node.
     */
    moveFocusToStartOfText: Controller['moveFocusToStartOfText'];

    /**
     * Move the start of the current selection backward n characters
     */
    moveStartForward: Controller['moveStartForward'];
    /**
     * Move the start of the current selection forward n characters
     */
    moveStartBackward: Controller['moveStartBackward'];
    /**
     * Move the start of the current selection to a new path and offset
     */
    moveStartTo: Controller['moveStartTo'];
    /**
     * Move the start of the current selection to the end of the closest block parent.
     */
    moveStartToEndOfBlock: Controller['moveStartToEndOfBlock'];
    /**
     * Move the start of the current selection to the end of the document.
     */
    moveStartToEndOfDocument: Controller['moveStartToEndOfDocument'];
    /**
     * Move the start of the current selection to the end of the closest inline parent.
     */
    moveStartToEndOfInline: Controller['moveStartToEndOfInline'];
    /**
     * Move the start of the current selection to the end of the next block.
     */
    moveStartToEndOfNextBlock: Controller['moveStartToEndOfNextBlock'];
    /**
     * Move the start of the current selection to the end of the next inline.
     */
    moveStartToEndOfNextInline: Controller['moveStartToEndOfNextInline'];
    /**
     * Move the start of the current selection to the end of the next text.
     */
    moveStartToEndOfNextText: Controller['moveStartToEndOfNextText'];
    /**
     * Move the start of the current selection to the end of the provided node.
     */
    moveStartToEndOfNode: Controller['moveStartToEndOfNode'];
    /**
     * Move the start of the current selection to the end of the previous block.
     */
    moveStartToEndOfPreviousBlock: Controller['moveStartToEndOfPreviousBlock'];
    /**
     * Move the start of the current selection to the end of the previous inline.
     */
    moveStartToEndOfPreviousInline: Controller['moveStartToEndOfPreviousInline'];
    /**
     * Move the start of the current selection to the end of the previous text.
     */
    moveStartToEndOfPreviousText: Controller['moveStartToEndOfPreviousText'];
    /**
     * Move the start of the current selection to the end of the current text node.
     */
    moveStartToEndOfText: Controller['moveStartToEndOfText'];
    /**
     * Move the start of the current selection to the start of the closest block parent.
     */
    moveStartToStartOfBlock: Controller['moveStartToStartOfBlock'];
    /**
     * Move the start of the current selection to the start of the document.
     */
    moveStartToStartOfDocument: Controller['moveStartToStartOfDocument'];
    /**
     * Move the start of the current selection to the start of the closest inline parent.
     */
    moveStartToStartOfInline: Controller['moveStartToStartOfInline'];
    /**
     * Move the start of the current selection to the start of the next block.
     */
    moveStartToStartOfNextBlock: Controller['moveStartToStartOfNextBlock'];
    /**
     * Move the start of the current selection to the start of the next inline.
     */
    moveStartToStartOfNextInline: Controller['moveStartToStartOfNextInline'];
    /**
     * Move the start of the current selection to the start of the next text node.
     */
    moveStartToStartOfNextText: Controller['moveStartToStartOfNextText'];
    /**
     * Move the start of the current selection to the start of the provided node.
     */
    moveStartToStartOfNode: Controller['moveStartToStartOfNode'];
    /**
     * Move the start of the current selection to the start of the previous block.
     */
    moveStartToStartOfPreviousBlock: Controller['moveStartToStartOfPreviousBlock'];
    /**
     * Move the start of the current selection to the start of the previous inline.
     */
    moveStartToStartOfPreviousInline: Controller['moveStartToStartOfPreviousInline'];
    /**
     * Move the start of the current selection to the start of the previous text node.
     */
    moveStartToStartOfPreviousText: Controller['moveStartToStartOfPreviousText'];
    /**
     * Move the start of the current selection to the start of the current text node.
     */
    moveStartToStartOfText: Controller['moveStartToStartOfText'];

    /**
     * Move the anchor and focus of the selection backward n characters.
     */
    moveBackward: Controller['moveBackward'];
    /**
     * Move the anchor and focus of the selection forward n characters.
     */
    moveForward: Controller['moveForward'];
    /**
     * Collapse the current selection at the provided new path and offset.
     */
    moveTo: Controller['moveTo'];
    /**
     * Collapse the current selection at the anchor.
     */
    moveToAnchor: Controller['moveToAnchor'];
    /**
     * Collapse the current selection at the focus.
     */
    moveToFocus: Controller['moveToFocus'];
    /**
     * Collapse the current selection at the start.
     */
    moveToStart: Controller['moveToStart'];
    /**
     * Collapse the current selection at the end.
     */
    moveToEnd: Controller['moveToEnd'];
    /**
     * Collapse the current selection at the end of the closest block parent.
     */
    moveToEndOfBlock: Controller['moveToEndOfBlock'];
    /**
     * Collapse the current selection at the end of the document.
     */
    moveToEndOfDocument: Controller['moveToEndOfDocument'];
    /**
     * Collapse the current selection at the end of the closest inline parent.
     */
    moveToEndOfInline: Controller['moveToEndOfInline'];
    /**
     * Collapse the current selection at the end of the next block.
     */
    moveToEndOfNextBlock: Controller['moveToEndOfNextBlock'];
    /**
     * Collapse the current selection at the end of the inline.
     */
    moveToEndOfNextInline: Controller['moveToEndOfNextInline'];
    /**
     * Collapse the current selection at the end of the next text node.
     */
    moveToEndOfNextText: Controller['moveToEndOfNextText'];
    /**
     * Collapse the current selection at the end of the provided node.
     */
    moveToEndOfNode: Controller['moveToEndOfNode'];
    /**
     * Collapse the current selection at the end of the previous block.
     */
    moveToEndOfPreviousBlock: Controller['moveToEndOfPreviousBlock'];
    /**
     * Collapse the current selection at the end of the previous inline.
     */
    moveToEndOfPreviousInline: Controller['moveToEndOfPreviousInline'];
    /**
     * Collapse the current selection at the end of the previous text node.
     */
    moveToEndOfPreviousText: Controller['moveToEndOfPreviousText'];
    /**
     * Collapse the current selection at the end of the current text node.
     */
    moveToEndOfText: Controller['moveToEndOfText'];
    /**
     * Collapse the current selection at the start of the nearest block parent.
     */
    moveToStartOfBlock: Controller['moveToStartOfBlock'];
    /**
     * Collapse the current selection at the start of the document.
     */
    moveToStartOfDocument: Controller['moveToStartOfDocument'];
    /**
     * Collapse the current selection at the start of the nearest inline parent.
     */
    moveToStartOfInline: Controller['moveToStartOfInline'];
    /**
     * Collapse the current selection at the start of the next block.
     */
    moveToStartOfNextBlock: Controller['moveToStartOfNextBlock'];
    /**
     * Collapse the current selection at the start of the next inline.
     */
    moveToStartOfNextInline: Controller['moveToStartOfNextInline'];
    /**
     * Collapse the current selection at the start of the next text node.
     */
    moveToStartOfNextText: Controller['moveToStartOfNextText'];
    /**
     * Collapse the current selection at the start of the provided node.
     */
    moveToStartOfNode: Controller['moveToStartOfNode'];
    /**
     * Collapse the current selection at the start of the previous block.
     */
    moveToStartOfPreviousBlock: Controller['moveToStartOfPreviousBlock'];
    /**
     * Collapse the current selection at the start of the previous inline.
     */
    moveToStartOfPreviousInline: Controller['moveToStartOfPreviousInline'];
    /**
     * Collapse the current selection at the start of the previous text node.
     */
    moveToStartOfPreviousText: Controller['moveToStartOfPreviousText'];
    /**
     * Collapse the current selection at the start of the current text node.
     */
    moveToStartOfText: Controller['moveToStartOfText'];

    /**
     * Move the current selection's anchor to the start of the document and its focus to the end of it, selecting everything.
     */
    moveToRangeOfDocument: Controller['moveToRangeOfDocument'];
    /**
     * Move the current selection's anchor to the start of the provided node and its focus to the end of it.
     */
    moveToRangeOf: Controller['moveToRangeOf'];
    /**
     * Merge the current selection with the provided properties
     */
    select: Controller['select'];

    // Document Range Commands //

    /**
     * Add a mark to the characters in the range.
     * Passing a string as `mark` will implicitly create a mark with that `type`
     */
    addMarkAtRange: Controller['addMarkAtRange'];
    /**
     * Delete everything in the range
     */
    deleteAtRange: Controller['deleteAtRange'];
    /**
     * Delete backward until the char boundary at a range
     */
    deleteCharBackwardAtRange: Controller['deleteCharBackwardAtRange'];
    /**
     * Delete backward until the line boundary at a range
     */
    deleteLineBackwardAtRange: Controller['deleteLineBackwardAtRange'];
    /**
     * Delete backward until the word boundary at a range
     */
    deleteWordBackwardAtRange: Controller['deleteWordBackwardAtRange'];
    /**
     * Delete backward n characters at a range
     */
    deleteBackwardAtRange: Controller['deleteBackwardAtRange'];
    /**
     * Delete forward until the char boundary at a range
     */
    deleteCharForwardAtRange: Controller['deleteCharForwardAtRange'];
    /**
     * Delete forward until the line boundary at a range
     */
    deleteLineForwardAtRange: Controller['deleteLineForwardAtRange'];
    /**
     * Delete forward until the word boundary at a range
     */
    deleteWordForwardAtRange: Controller['deleteWordForwardAtRange'];
    /**
     * Delete forward n characters at a range
     */
    deleteForwardAtRange: Controller['deleteForwardAtRange'];

    /**
     * Insert a block node at range, splitting text to make room if it is non-empty.
     * If the range is expanded, it will be deleted first.
     */
    insertBlockAtRange: Controller['insertBlockAtRange'];
    /**
     * Insert a document fragment at a range, if the range is expanded, it will be deleted first.
     */
    insertFragmentAtRange: Controller['insertFragmentAtRange'];
    /**
     * Insert a new inline at range, splitting text to make room if it is non-empty.
     * If the range is expanded, it will be deleted first.
     */
    insertInlineAtRange: Controller['insertInlineAtRange'];
    /**
     * Insert text at range. If the range is expanded it will be deleted first
     */
    insertTextAtRange: Controller['insertTextAtRange'];
    /**
     * Set the properties of the block nodes in a range.
     * Passing a string will set the nodes' type only
     */
    setBlocksAtRange: Controller['setBlocksAtRange'];
    /**
     * Set the properties of the inline nodes in a range.
     * Passing a string will set the nodes' type only
     */
    setInlinesAtRange: Controller['setInlinesAtRange'];
    /**
     * Split the block in a range by depth levels. If the range is expanded it will be deleted first.
     */
    splitBlockAtRange: Controller['splitBlockAtRange'];
    /**
     * Split the inline in a range by depth levels. If the range is expanded it will be deleted first.
     */
    splitInlineAtRange: Controller['splitInlineAtRange'];
    /**
     * Remove a mark from characters in the range. Passing a string will
     * implicitly create a mark of that type for deletion.
     */
    removeMarkAtRange: Controller['removeMarkAtRange'];
    /**
     * Add or remove a mark from characters in the range. Passing a string will
     * implicitly create a mark of that type for deletion.
     */
    toggleMarkAtRange: Controller['toggleMarkAtRange'];
    /**
     * Unwrap all block nodes in a range that match properties
     */
    unwrapBlockAtRange: Controller['unwrapBlockAtRange'];
    /**
     * Unwrap all inline nodes in a range that match properties
     */
    unwrapInlineAtRange: Controller['unwrapInlineAtRange'];
    /**
     * wrap all block nodes in a range with a new block node with the provided properties
     */
    wrapBlockAtRange: Controller['wrapBlockAtRange'];
    /**
     * wrap all inline nodes in a range with a new inline node with the provided properties
     */
    wrapInlineAtRange: Controller['wrapInlineAtRange'];
    /**
     * Surround the text in a range with a prefix and suffix. If the suffix is ommitted,
     * the prefix will be used instead.
     */
    wrapTextAtRange: Controller['wrapTextAtRange'];

    // Node commands //
    /**
     * Add a mark to length characters starting at an offset in a node by key
     */
    addMarkByKey: Controller['addMarkByKey'];
    /**
     * Add a mark to length characters starting at an offset in a node by path
     */
    addMarkByPath: Controller['addMarkByPath'];
    /**
     * Insert a node at index inside a parent node by key
     */
    insertNodeByKey: Controller['insertNodeByKey'];
    /**
     * Insert a node at index inside a parent node by apth
     */
    insertNodeByPath: Controller['insertNodeByPath'];
    /**
     * Insert a document fragment at index inside a parent node by key
     */
    insertFragmentByKey: Controller['insertFragmentByKey'];
    /**
     * Insert a document fragment at index inside a parent node by path
     */
    insertFragmentByPath: Controller['insertFragmentByPath'];
    /**
     * Insert text at an offset in a text node by its key with optional marks
     */
    insertTextByKey: Controller['insertTextByKey'];
    /**
     * Insert text at an offset in a text node by its path with optional marks
     */
    insertTextByPath: Controller['insertTextByPath'];
    /**
     * Merge a node by its key with its previous sibling
     */
    mergeNodeByKey: Controller['mergeNodeByKey'];
    /**
     * Merge a node by its path with its previous sibling
     */
    mergeNodeByPath: Controller['mergeNodeByPath'];
    /**
     * Move a node by its key to a new parent node with with newkey at newindex
     */
    moveNodeByKey: Controller['moveNodeByKey'];
    /**
     * Move a node by its path to a new parent node with with newpath at newindex
     */
    moveNodeByPath: Controller['moveNodeByPath'];
    /**
     * Remove a mark from length characters starting at an offset in a node by key
     */
    removeMarkByKey: Controller['removeMarkByKey'];
    /**
     * Remove a mark from length characters starting at an offset in a node by path
     */
    removeMarkByPath: Controller['removeMarkByPath'];
    /**
     * Remove a node from the document by its key
     */
    removeNodeByKey: Controller['removeNodeByKey'];
    /**
     * Remove a node from the document by its path
     */
    removeNodeByPath: Controller['removeNodeByPath'];
    /**
     * Replace a node in the document with a new node by key
     */
    replaceNodeByKey: Controller['replaceNodeByKey'];
    /**
     * Replace a node in the document with a new node by path
     */
    replaceNodeByPath: Controller['replaceNodeByPath'];
    /**
     * Remove length characters of text starting at an offset in a node by key
     */
    removeTextByKey: Controller['removeTextByKey'];
    /**
     * Remove length characters of text starting at an offset in a node by path
     */
    removeTextByPath: Controller['removeTextByPath'];
    /**
     * Set a dictionary of properties on a mark by its key.
     */
    setMarkByKey: Controller['setMarkByKey'];
    /**
     * Set a dictionary of properties on a mark by its path.
     */
    setMarksByPath: Controller['setMarksByPath'];
    /**
     * Set a dictionary of properties on a node by its key.
     */
    setNodeByKey: Controller['setNodeByKey'];
    /**
     * Set a dictionary of properties on a node by its key.
     */
    setNodeByPath: Controller['setNodeByPath'];
    /**
     * Split a node by its key at an offset
     */
    splitNodeByKey: Controller['splitNodeByKey'];
    /**
     * Split a node by its path at an offset
     */
    splitNodeByPath: Controller['splitNodeByPath'];
    /**
     * Unwrap all inner content of an inline node by its key that match properties
     */
    unwrapInlineByKey: Controller['unwrapInlineByKey'];
    /**
     * Unwrap all inner content of an inline node by its path that match properties
     */
    unwrapInlineByPath: Controller['unwrapInlineByPath'];
    /**
     * Unwrap all inner content of a block node by its key that match properties
     */
    unwrapBlockByKey: Controller['unwrapBlockByKey'];
    /**
     * Unwrap all inner content of a block node by its path that match properties
     */
    unwrapBlockByPath: Controller['unwrapBlockByPath'];
    /**
     * Unwrap a single node from its parent. if the node is surrounded with siblings the parent will be split.
     * If the node is an only child, it will replace the parent
     */
    unwrapNodeByKey: Controller['unwrapNodeByKey'];
    /**
     * Unwrap a single node from its parent. if the node is surrounded with siblings the parent will be split.
     * If the node is an only child, it will replace the parent
     */
    unwrapNodeByPath: Controller['unwrapNodeByPath'];
    /**
     * Wrap the given node by key in an Inline node that matches properties.
     */
    wrapInlineByKey: Controller['wrapInlineByKey'];
    /**
     * Wrap the given node by path in an Inline node that matches properties.
     */
    wrapInlineByPath: Controller['wrapInlineByPath'];
    /**
     * Wrap the given node by key in a block node that matches properties.
     */
    wrapBlockByKey: Controller['wrapBlockByKey'];
    /**
     * Wrap the given node by path in a block node that matches properties.
     */
    wrapBlockByPath: Controller['wrapBlockByPath'];
    /**
     * Wrap the node with the specified key with the parent node, this will clear all children of the parent.
     */
    wrapNodeByKey: Controller['wrapNodeByKey'];
    /**
     * Wrap the node with the specified key with the parent node, this will clear all children of the parent.
     */
    wrapNodeByPath: Controller['wrapNodeByPath'];

    // Miscellaneous Commands //
    /**
     * Normalizes the document with the value's schema. Run automatically unless manually disabled.
     * Use it sparingly and strategically, as it can be very expensive.
     */
    normalize: Controller['normalize'];
    /**
     * Calls the provided function with the current editor as the first argument.
     * Normalization does not occur while the function is executing and is deferred to execute immediately after completion.
     *
     * This allows for sequence change operations to not be interrupted by normalization
     */
    withoutNormalizing: Controller['withoutNormalizing'];
    /**
     * By default all operations are saved to the editor's history. If you have
     * changes that you don't want to show up in history, use this function.
     */
    withoutSaving: Controller['withoutSaving'];
    /**
     * Usually all command operations are merged into a single save point in history,
     * if more control is desired, create single save points using this function.
     */
    withoutMerging: Controller['withoutMerging'];

    // History Commands //
    /**
     * Move forward one step in the history
     */
    redo: Controller['redo'];
    /**
     * Move backward one step in the history
     */
    undo: Controller['undo'];
    /**
     * Snapshot the current selection for undo purposes.
     */
    snapshotSelection: Controller['snapshotSelection'];
}

export type SlateType =
    | "fragment"
    | "html"
    | "node"
    | "rich"
    | "text"
    | "files";

export function cloneFragment(
    event: Event,
    value: Value,
    fragment?: Document,
    callback?: () => void
): void;
export function findDOMNode(node: Node, win?: Window): Element;
export function findDOMRange(range: Range, win?: Window): Range;
export function findNode(element: Element, value: Value): Node;
export function findRange(selection: Selection, value: Value): Range;
export function getEventRange(event: Event, value: Value): Range;
export function getEventTransfer(event: Event): { type: SlateType; node: Node };
export function setEventTransfer(
    event: Event,
    type: SlateType,
    data: any
): void;
