

export const ProductSetupStep = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Add Your First Product</h3>
      <p className="text-gray-600">
        Start selling by adding your first product to your store.
      </p>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            className="w-full px-3 py-2 border border-[var(--color-border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-info)]"
            placeholder="Enter product name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="productDescription"
            rows={3}
            className="w-full px-3 py-2 border border-[var(--color-border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-info)]"
            placeholder="Describe your product"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="flex shadow-sm">
              <span className="inline-flex items-center px-3 py-2 border border-r-0 border-[var(--color-border-strong)] bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]">
                GHS
              </span>
              <input
                id="productPrice"
                type="text"
                className="flex-1 px-3 py-2 border border-[var(--color-border-strong)] rounded-none focus:outline-none focus:ring-2 focus:ring-[var(--color-info)]"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              id="productQuantity"
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-[var(--color-border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-info)]"
              placeholder="1"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select 
              id="productCategory"
              className="w-full px-3 py-2 border border-[var(--color-border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-info)]"
            >
              <option value="">Select category</option>
              <option value="clothing">Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home & Garden</option>
              <option value="beauty">Beauty</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
