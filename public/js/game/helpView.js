/**
 * Created by manland on 12/04/15.
 */
export class HelpView {
    constructor() {
        let helpHtmlElement = document.getElementById('js-help-container');
        document.getElementById('js-help-switch').addEventListener('mouseover', function() {
            helpHtmlElement.style.display = 'block';
        });
        helpHtmlElement.addEventListener('mouseout', function() {
            helpHtmlElement.style.display = '';
        });
    }
}