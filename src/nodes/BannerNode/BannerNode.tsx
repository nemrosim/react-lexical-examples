import {
    EditorConfig,
    ElementNode,
    LexicalEditor,
    $createParagraphNode,
    LexicalNode,
    RangeSelection,
    SerializedElementNode,
    Spread,
} from "lexical";

export type SerializedBannerNode = Spread<
    {
        customValue: string;
    },
    SerializedElementNode
>;

export class BannerNode extends ElementNode {
    createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
        const div = document.createElement("div");
        div.className = _config.theme.banner;
        return div;
    }

    static clone(node: BannerNode): BannerNode {
        return new BannerNode(node.__key);
    }

    static getType(): string {
        return "banner";
    }

    /**
     * Returning false tells Lexical that this node does not need its
     * DOM element replacing with a new copy from createDOM.
     */
    updateDOM(
        _prevNode: unknown,
        _dom: HTMLElement,
        _config: EditorConfig,
    ): boolean {
        return false;
    }

    /**
     * Node should be set to paragraph when user delete all content
     */
    collapseAtStart(_: RangeSelection): boolean {
        const paragraph = $createParagraphNode();
        const children = this.getChildren();
        children.forEach((child) => paragraph.append(child));
        this.replace(paragraph);

        return true;
    }

    /**
     * Node should be set to paragraph when user press Enter.
     * Node will remain the same on Shift+Enter
     */
    insertNewAfter(
        _: RangeSelection,
        restoreSelection?: boolean,
    ): LexicalNode | null {
        const paragraph = $createParagraphNode();
        const direction = this.getDirection();
        paragraph.setDirection(direction);
        this.insertAfter(paragraph, restoreSelection);

        return paragraph;
    }

    static importJSON(_: SerializedBannerNode): BannerNode {
        return new BannerNode();
    }

    exportJSON(): SerializedBannerNode {
        return {
            type: "banner",
            version: 1,
            children: [],
            customValue: "anything you like",
            format: "",
            indent: 1,
            direction: null,
        };
    }
}
