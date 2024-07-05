import MarkdownIt from 'markdown-it'
import markdownItContainer from "markdown-it-container";
import * as fs from "node:fs";
import * as path from "node:path";

export const setupContainerDemo = (md: MarkdownIt) => {
    md.use(markdownItContainer, 'demo', {
        validate(params) {
            return !!params.trim().match(/^demo\s*(.*)$/)
        },
        render(tokens, idx) {
            if (tokens[idx].nesting === 1) {
                // 描述信息
                const token = tokens[idx + 2];
                // 组件路径
                let componentSrc = '';
                // sandbox地址
                let sandboxUrl = '';
                if (!token) return new Error('请传递Demo组件路径')
                const arr = token.content.split('\n');
                componentSrc = arr[0];
                sandboxUrl = arr[1];


                const sourceCode = fs.readFileSync(path.resolve(__dirname, `../../examples/${componentSrc}.vue`), 'utf8');

                return `<Demo path="${componentSrc}.vue" source-code="${encodeURIComponent(sourceCode)}">`

            } else {
                return '</Demo>'
            }
        },
    })
}