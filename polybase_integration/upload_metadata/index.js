import { NFTStorage, File } from "nft.storage"
import fs from "fs"
import 'dotenv/config';

async function main() {
    const client = new NFTStorage({
        token: process.env.TOKEN,
        
    })

    const name = 'EVENT_NAME'
    const event = 'EVENT_NUMBER'
    const metadata = await client.store({
        name: name,
        description:'EVENT_DESCRIPTION',
        image: new File([
            fs.readFileSync('/mnt/c/Users/rey_g/Downloads/Blockchain/DAOSuite/polybase_integration/event_images/image_event'+event+'.jpg')
        ],
        'image_event'+event+'.jpg',
        { type : 'image/jpg'})
    })
    
    console.log(metadata.url)
    console.log(metadata.data)

    fs.writeFile('./upload_metadata/store_metadata/'+event+'_'+ name +'.json', JSON.stringify(metadata.data), (err) => {
        if(err){
            console.error("Error saving JSON file",err)
        } else {
            console.log("JSON saved successfully")
        }
    })
    
}

main()