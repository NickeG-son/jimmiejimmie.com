import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MenuItem, Category } from "@/lib/types";

interface MenuProps {
  menuItems: MenuItem[];
  categories: Category[];
}

export default function Menu({ menuItems, categories }: MenuProps) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item._id}>
            {item.isDropdown ? (
              // --- SCENARIO A: IT IS A DROPDOWN (e.g. "Galleri") ---
              <>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/20 hover:text-white dark:text-white">
                  <Link href={item.link || "#"} legacyBehavior passHref>
                    {item.title}
                  </Link>
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4 md:w-[400px]">
                    {/* Look here! We are looping through the Categories! */}
                    {categories.map((category) => (
                      <li key={category._id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/galleri/${category.slug}`}
                            className="hover:bg-accent hover:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                          >
                            <div className="text-sm leading-none font-medium">{category.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              // --- SCENARIO B: IT IS A NORMAL LINK (e.g. "Om Mig") ---
              <Link href={item.link || "#"} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/20 hover:text-white dark:text-white`}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
