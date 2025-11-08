import { chromium } from '@playwright/test';

export async function obtenerUltimoCapitulo() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://devilnovels.com/contra-los-dioses/');

        // Seleccionar el primer <a> que posee el último capítulo
        const ultimoCapitulo = page.locator('h3.elementor-post__title > a:has-text("ATG Capitulo")').first();

        const textoCapitulo = await ultimoCapitulo.textContent();
        const urlCapitulo = await ultimoCapitulo.getAttribute('href');

        return {
            texto: textoCapitulo?.trim(),
            url: urlCapitulo
        };

    } catch (error) {
        console.error('Error al obtener capítulo:', error);
        return null;
    } finally {
        await browser.close();
    }
}