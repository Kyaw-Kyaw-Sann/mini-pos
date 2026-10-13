import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import type { Product, ProductFormData } from '../types'

type ProductFormPageProps = {
  products: Product[]
  onAddProduct: (productData: ProductFormData) => void
  onUpdateProduct: (
    productId: string,
    productData: ProductFormData,
  ) => void
}

function ProductFormPage({
  products,
  onAddProduct,
  onUpdateProduct,
}: ProductFormPageProps) {
  const { productId } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(productId)
  const productToEdit = products.find((product) => product.id === productId)

  function handleSubmit(productData: ProductFormData) {
    if (productId && productToEdit) {
      onUpdateProduct(productId, productData)
      toast.success('Product updated successfully.')
    } else {
      onAddProduct(productData)
      toast.success('Product added successfully.')
    }

    navigate('/products')
  }

  if (isEditing && !productToEdit) {
    return (
      <section className="rounded-lg border border-border bg-surface p-8 text-center">
        <h2 className="text-2xl font-bold text-heading">Product Not Found</h2>
        <p className="mt-2 text-body">
          The product you want to edit does not exist.
        </p>
        <Link
          to="/products"
          className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-on-primary hover:bg-primary-hover"
        >
          Back to Products
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-heading">
        {isEditing ? 'Edit Product' : 'Add Product'}
      </h2>
      <p className="mt-2 text-body">
        {isEditing
          ? 'Update the product information below.'
          : 'Enter the new product information below.'}
      </p>

      <ProductForm
        key={productToEdit?.id ?? 'new-product'}
        initialProduct={productToEdit}
        submitLabel={isEditing ? 'Update Product' : 'Add Product'}
        onSubmit={handleSubmit}
      />
    </section>
  )
}

export default ProductFormPage
