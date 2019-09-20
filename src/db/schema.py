schema = {
    'tables': {
        'users': {
            'columns': {'username': str, 'password': str}
        },
        'products': {
            'columns': {'product_name': str, 'product_price': float, 'product_qty': int}
        },
        'cart': {
            'columns': {'product_name': str, 'product_price': float, 'product_qty': int, 'total_price': float}
        }
    }
}
