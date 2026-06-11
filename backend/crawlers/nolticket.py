from playwright.async_api import async_playwright

async def crawl_nolticket():
    url = "https://nol.interpark.com/ticket"

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()

            await page.goto(url, wait_until="domcontentloaded")
            await page.wait_for_timeout(5000)

            items = await page.query_selector_all("div.swiper-slide")

            results = []

            for item in items:
                title_el = await item.query_selector("dt")
                place_el = await item.query_selector("dd")

                title = await title_el.inner_text() if title_el else None
                place = await place_el.inner_text() if place_el else None

                if title:
                    results.append({
                        "title": title,
                        "place": place
                    })

            await browser.close()
            return results

    except Exception as e:
        print("CRAWL ERROR:", e)
        return []