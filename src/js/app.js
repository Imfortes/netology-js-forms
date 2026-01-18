// TODO: write code here

console.log('app.js bundled');

function popover (e) {
    const btn = e.currentTarget
    const title = btn.dataset.title
    const content = btn.dataset.content

    console.log('title:', title, 'content:', content)


}


const btnPopover = document.querySelector('.btn-popover');

btnPopover.addEventListener('click', popover)
// popover(btnPopover);