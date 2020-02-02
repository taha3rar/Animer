export const tooltips = {
  dashboard: {
    personal_information: 'Edit all your personal information'
  },
  orders: {
    orders_list: {
      place_order: 'Place a Purchase Order and send it to your seller',
      external_po: 'An External Purchase Order is a quick order to any of your suppliers',
      internal_po: 'Internal Purchase Order lets you send an order to one of your contacts on Avenews-GT'
    },
    order_generator: {
      submit: 'After submitting your order, you seller will receive a notification'
    }
  },
  quote_request: {
    create_qr: 'Create a Quote Request and ask your sellers how much they are willing to sell their products'
  },
  invoices: {
    issue_order: 'Issue an Invoice and send it to your Buyer'
  },
  clients: {
    clients_list: {
      add_client: 'Adding a contact will let you manage all your future transactions with him'
    }
  },
  products: {
    create_agri_product: 'Create an agricultural product and start trading',
    create_processed_product: 'Create a processed product and start trading',
    create_input_product: 'Create an input product and start trading',
    product_generator: {
      agricultural: {
        estimated_number_packages: 'Calculated based on Total Amount and Amount per Packaged Product fields',
        package_price: 'Price calculated based on Amount per Packaged product and Price per Unit fields',
        total_price: 'Total price calculated based on Total Amount and Price per Unit fields'
      },
      processed: {
        amount_items: 'Calculated based on Number of Items per Package and Number of Package fields',
        total_price: 'Total price Calculated based on Number of Package and Price per Package fields'
      }
    }
  }
};
