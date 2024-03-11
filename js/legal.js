/**
 * Event listener that executes when the DOM content is loaded.
 * It asynchronously generates the sidebar and header.
 */
document.addEventListener('DOMContentLoaded', async function () {
    await generateSidebar();
    await generateHeader();
});