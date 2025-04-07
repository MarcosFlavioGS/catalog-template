import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const newProduct = await request.json()

    // Read the current products
    const filePath = path.join(process.cwd(), 'src/data/products.json')
    const productsData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    // Add the new product
    productsData.push(newProduct)

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(productsData, null, 2))

    return NextResponse.json({ success: true, product: newProduct })
  } catch (error) {
    console.error('Error adding product:', error)
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    )
  }
} 