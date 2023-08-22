import {
    EditorConfig,
    ElementNode,
    LexicalEditor,
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
