import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fontIcon } from "@/types";



export default function FontIcon({fontIcon, className}: {fontIcon: fontIcon, className: string})
{
    return (
        <>
            <span className={className}>
            {fontIcon == "facebook" && <span className="text-[#1877F2] text-3xl ">
                  <FontAwesomeIcon icon={fab.faFacebook} />
                </span>}
            {fontIcon == "whatsapp" && <span className="text-[#25D366] text-3xl">
                  <FontAwesomeIcon icon={fab.faWhatsapp} />
                </span>}
            {fontIcon == "instagram" && <span className="">
                <FontAwesomeIcon icon={fab.faInstagram} className="text-blaze-400 text-3xl" />
                </span>}
            </span>
        </>
    );
}