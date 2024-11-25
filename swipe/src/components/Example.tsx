import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useEffect, useState } from "react";
// import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";
import { useLocation } from "react-router";
const tabs = [
  {
    title: "Invoice",
    link: "invoice",
  },
  {
    title: "Products",
    link: "products",
  },
  {
    title: "Customers",
    link: "customers",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const location = useLocation();
  location.pathname;
  const [navigation, setNavigationTabs] = useState([
    { name: "Upload", href: "upload", current: false },
    { name: "Invoice", href: "invoice", current: false },
    { name: "Products", href: "products", current: false },
    { name: "Customers", href: "customers", current: false },
  ]);

  useEffect(() => {
    setNavigationTabs((prev) => {
      const tabss = prev.map((item) => {
        if (location.pathname.includes(item.href)) {
          return { ...item, current: true };
        }
        return { ...item, current: false };
      });
      return tabss;
    });
  }, [location.pathname]);

  return (
    <Disclosure as="nav" className="bg-white border-b">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <IoMdMenu
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <RxCross2
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center ">
              <Link to={"/"}>
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-black hover:bg-slate-300  ",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* can put */}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
