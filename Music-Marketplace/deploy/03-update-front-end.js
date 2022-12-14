const {
    frontEndContractsFile,
    frontEndAbiLocation,
} = require("../helper-hardhat-config")
require("dotenv").config()
const fs = require("fs")
const { network, ethers } = require("hardhat")

module.exports = async () => {
    console.log('deploy')
//     if (process.env.UPDATE_FRONT_END) {
//         console.log("Writing to front end...")
//         await updateContractAddresses()
//         await updateAbi()
//         console.log("Front end written!")
//     }
// }

// async function updateAbi() {
//     const nftMarketplace = await ethers.getContract("NftMarketplace")
    
//     fs.writeFileSync(
//         `${frontEndAbiLocation}NftMarketplace.json`,
//         nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
//     )

//     const basicNft = await ethers.getContract("BasicCourseNft")
//     fs.writeFileSync(
//         `${frontEndAbiLocation}BasicCourseNft.json`,
//         basicNft.interface.format(ethers.utils.FormatTypes.json)
//     )

}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const nftAddress = await ethers.getContract("BasicCourseNft")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
 
    contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address], NftAddress: [nftAddress.address] }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
