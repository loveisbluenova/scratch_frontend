import storage from './storage';
import {inlineSvgFonts} from 'scratch-svg-renderer';

// Contains 'font-family', but doesn't only contain 'font-family="none"'
const HAS_FONT_REGEXP = 'font-family(?!="none")';

const getCostumeUrl = (function () {
    let cachedAssetId;
    let cachedUrl;

    return function (asset) {

        if (cachedAssetId === asset.assetId) {
            return cachedUrl;
        }

        cachedAssetId = asset.assetId;

        // If the SVG refers to fonts, they must be inlined in order to display correctly in the img tag.
        // Avoid parsing the SVG when possible, since it's expensive.
        // if (asset.assetType === storage.AssetType.ImageVector) {
        //     console.log('cachedUrl  52', asset);
        //     const svgString = asset.decodeText();
        //     if (svgString.match(HAS_FONT_REGEXP)) {
        //         const svgText = inlineSvgFonts(svgString);
        //         cachedUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
        //     } else {
        //         cachedUrl = asset.encodeDataURI();
        //         console.log('cachedUrl  522', asset,cachedUrl)
        //     }
        // } else {
        //     console.log('asset.encodeDataURI()', asset)
        //     cachedUrl = asset.encodeDataURI();
        // }
        cachedUrl = `https://assets.scratch.mit.edu/${asset.assetId}.${asset.dataFormat}`
        console.log('cachedUrl', cachedUrl)
        return cachedUrl;
    };
}());

export {
    getCostumeUrl as default,
    HAS_FONT_REGEXP
};
