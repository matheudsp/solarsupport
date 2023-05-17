import Image from "next/image";
import logo from '../../../../public/logo09.png'

interface logoProps {
  className?
}

export default function Logo({className }:logoProps) {
    return (
      <div className={`w-fit mx-auto`}>
        <Image src={logo} alt='logo' className={` ${className}`}  />
      </div>
    );
  }