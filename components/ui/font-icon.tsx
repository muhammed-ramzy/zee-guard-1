import Image from "next/image";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import instagram from "@/assets/images/instagram.svg";
import { fontIcon } from "@/types";



export default function FontIcon({fontIcon, className}: {fontIcon: fontIcon, className: string})
{
    return (
        <>
            <span className={className}>
            {fontIcon == "facebook" && <span className="text-[#1877F2]">
                  <FontAwesomeIcon icon={fab.faFacebook} />
                </span>}
            {fontIcon == "whatsapp" && <span className="text-[#25D366]">
                  <FontAwesomeIcon icon={fab.faWhatsapp} />
                </span>}
            {fontIcon == "instagram" && <span className="">
                  <Image src={instagram} alt={"Instagram account"} />
                </span>}
            </span>
        </>
    );
}