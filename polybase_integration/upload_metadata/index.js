import { NFTStorage, File } from "nft.storage"
import fs from "fs"
import 'dotenv/config';

async function main() {
    const client = new NFTStorage({
        token: process.env.TOKEN,
        
    })

    const name = 'Hash Fest'
    const event = '10'
    const metadata = await client.store({
        name: name,
        description:'HashFest, el festival definitivo para los amantes de la música, el arte y blockchain en Medellín! Nuestro festival ofrece actuaciones musicales en vivo de artistas locales e internacionales, creando una atmósfera única que celebra la rica herencia musical de Medellín. Además, podrás disfrutar de charlas y talleres interesantes sobre tecnología, arte digital y blockchain, incluyendo contratos inteligentes, NFTs y aplicaciones descentralizadas.  Únete a nosotros en HashFest y descubre cómo Medellín lidera la fusión de cultura y tecnología.',
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