import Link from "next/link"

export default function NavLinks({ links, nav_className, ul_className, li_className, onNavigate }: { links: NavItem[], nav_className?: string, ul_className?: string, li_className?: string, onNavigate?: () => void }) {
    return (
        <nav className={nav_className ? nav_className : ""}>
            <ul className={ul_className ? ul_className : ""}>
                {links.map((link: NavItem, index: number) => {
                    return (
                        <li key={index} className={li_className ? li_className : ""}>
                            <Link href={`${link.path}`} onClick={onNavigate}>
                                {link.label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
