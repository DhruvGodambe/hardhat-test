const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');

describe("Test Contract", () => {
    let Test, test, owner;

    beforeEach(async () => {
        [owner, addr] = await ethers.getSigners();
        Test = await ethers.getContractFactory("Test");
        test = await Test.deploy(owner.address);
        console.log("initial owner: ", owner.address);
    })

    describe("Deployment", () => {
        it("shows the owner of Test contract", async () => {
            console.log("current owner: ", await test.functions.owner());
        })

        it("renounces ownership", async () => {
            console.log(await test.functions.renounceOwnership(addr.address, {
                from: owner.address,
                value: ethers.utils.parseEther("1.0")
            }));
            console.log("current owner: ", await test.functions.owner());
            
            let bal = await addr.getBalance()
            console.log("balance of addr: ", ethers.utils.formatEther(bal))
            
            console.log(await test.connect(addr).functions.claimOwnershipReward());
            
            bal = await addr.getBalance()
            console.log("balance of addr: ", ethers.utils.formatEther(bal))
        })

        // it("claim ownership rewards", async() => {
        //     console.log("balance of addr: ", (await addr.getBalance()).toString())
        //     console.log(await test.connect(addr).functions.claimOwnershipReward());
        //     console.log("balance of addr: ", (await addr.getBalance()).toString())
        // })
    })
})