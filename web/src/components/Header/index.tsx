import { useState } from 'react';


import Logo from '../ui/Logo';
import {FiMenu} from 'react-icons/fi'
import {BsArrowRightShort} from 'react-icons/bs'
import {BiExit} from 'react-icons/bi'

import { signOut } from '@/contexts/UserContext';

import React from 'react';
import { IconType } from 'react-icons';
/** Links */
interface NavLink {
  title: string;
  href?: string;
  children?: NavLink[];
  fn? : () => void
  icon? : IconType
}

const links: NavLink[] = [
  {
    title: 'Início',
    href: '/',
    
  },
//   {
//     title: 'Services',
//     href: '#',
//     children: [
//       {
//         title: 'Web development',
//         href: '/services/web-development',
//       },
//       {
//         title: 'Digital marketing',
//         href: '/services/digital-marketing',
//       },
//       {
//         title: 'Brand strategy',
//         href: '/services/brand-strategy',
//       },
//     ],
//   },
  {
    title: 'Calculadora',
    href: '/calculadora',
    
  },
  {
    title:'Sair',
    fn: signOut,
    icon: BiExit,
  }
];




/** NavLink */
interface NavLinkProps extends React.HTMLProps<HTMLLinkElement> {
  currentPath?: string;
  fn?: () => void
  icon?: IconType
}

function NavLink({ children, className, currentPath,fn, href, icon}: NavLinkProps) {
  return (
    <a
      className={`
         flex flex-row whitespace-nowrap px-3 py-2 text-sm font-semibold no-underline transition hover:text-slate-900
        ${
          currentPath === href
            ? 'text-slate-900'
            : 'text-slate-400'
        }
        ${className}
      `}
      onClick={fn}
      href={href}
      
    >
      {children}
      {icon && (React.createElement(icon, { size: "20" }))}
    </a>
    
  );
}

/** Navigation */
interface NavigationProps {
  mobile?: boolean;
  navLinks?: NavLink[];
}

function Navigation({ mobile = false, navLinks = [] }: NavigationProps) {
  const [mobileNavigationOpened, setMobileNavigationOpened] = useState(false);

  const navClassName = `
    bg-white text-base 
    ${
      mobile
        ? `transition transform -right-1/2 fixed top-0 z-20 h-full w-1/2 overflow-y-auto py-4 sm:hidden ${
            mobileNavigationOpened ? '-translate-x-full shadow-2xl' : ''
          }`
        : 'hidden sm:block'
    }
  `;
  const navListClassName = `
    flex
    ${mobile ? 'flex-col space-y-2' : 'items-center space-x-2'}
  `;
  const navListItemClassName = `
    group relative
    ${mobile ? 'w-full overflow-x-visible text-right' : ''}
  `;
  const navListLinkClassName = mobile ? 'mx-4' : '';
  const navChildrenClassName = `
    delay-75 ease-in-out space-y-2 
    ${
      mobile
        ? 'h-0 overflow-y-hidden bg-slate-50 px-4 py-0 transition-all group-hover:h-full group-hover:py-4'
        : 'invisible absolute z-30 rounded-lg border border-slate-50 bg-white p-4 opacity-0 shadow-xl transition-opacity group-hover:visible group-hover:opacity-100 '
    }
  `;

  const closeMobileNavigation = () => setMobileNavigationOpened(false);

  return (
    <>
      {mobile && (
        <button
          className="block text-slate-400 hover:text-slate-900 sm:hidden"
          onClick={() => setMobileNavigationOpened(true)}
          title="Open navigation menu"
        >
          <FiMenu  size={18}/>
        </button>
      )}

      {mobile && mobileNavigationOpened && (
        <div
          className="fixed top-0 right-0 z-10 h-full w-full bg-slate-900 opacity-70  sm:hidden"
          onClick={closeMobileNavigation}
        ></div>
      )}

      <nav className={navClassName}>
        <ul className={navListClassName}>
          {mobile && (
            <li className="text-right">
              <button
                className="px-6 py-2 text-slate-400 hover:text-slate-900 "
                onClick={closeMobileNavigation}
              >
                <BsArrowRightShort size={22}/>
              </button>
            </li>
          )}
          {navLinks.map(({ title, href, children, fn, icon }) => (
            <li className={navListItemClassName} key={href}  onClick={fn}>
              <NavLink
                className={navListLinkClassName}
                currentPath="/home"
                href={href}
                icon={icon}
              >
                {title}
               
              </NavLink>
              
              {!!children?.length && (
                <ul className={navChildrenClassName}>
                  {children.map((child) => (
                    <li key={child.href}>
                      <NavLink href={child.href}>{child.title}</NavLink>
                      
                    </li>
                  ))}
                </ul>
              )}
              
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

/** Header */
interface HeaderProps {
  navLinks?: NavLink[];
}

export function Header({ navLinks = links }: HeaderProps) {
  return (
    <header className="container bg-gray-50 mx-auto flex w-full items-center justify-between py-4 px-6">
      <a href="/">
        <Logo className="w-28"/>
      </a>
      <Navigation navLinks={navLinks} />
      <Navigation mobile navLinks={navLinks} />
    </header>
  );
}
