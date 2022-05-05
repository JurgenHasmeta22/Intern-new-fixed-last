import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon"
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon"
import "./ErrorPage.css"

export default function ErrorPage() {

    return (

        <>

            <HeaderCommon />

            <div className="error">
                <span>ERROR 404</span>
            </div>

            <FooterCommon />

        </>

    )

}