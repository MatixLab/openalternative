import wretch from "wretch"

type Metadata = {
  title: string
  description: string
  image: string
}

/**
 * Checks if an email is a disposable email by checking if the domain is in the disposable domains list
 * @param email
 * @returns
 */
export const isDisposableEmail = async (email: string) => {
  const disposableJsonURL =
    "https://rawcdn.githack.com/disposable/disposable-email-domains/master/domains.json"

  const disposableDomains = await wretch(disposableJsonURL).get().json<string[]>()
  const domain = email.split("@")[1]

  return disposableDomains.includes(domain)
}

/**
 * Get the URL metadata
 * @param url - The URL to get the metadata for
 * @returns The metadata
 */
export const getUrlMetadata = async (url: string) => {
  try {
    const api = wretch(`https://api.dub.co/metatags?url=${url}`)
    const metadata = await api.get().json<Metadata>()

    return metadata
  } catch (error) {
    console.error("Error fetching metadata:", error)
    return
  }
}

/**
 * Returns the position of an element with the given ID relative to the top of the viewport.
 * @param slug - The slug of the element to get the position of.
 * @returns An object with the ID and top position of the element, or undefined if the element is not found.
 */
export const getElementPosition = (id?: string) => {
  const el = document.getElementById(id || "")
  if (!el) return

  const style = window.getComputedStyle(el)
  const scrollMt = Number.parseFloat(style.scrollMarginTop)
  const top = Math.floor(window.scrollY + el.getBoundingClientRect().top - scrollMt)

  return { id, top }
}
