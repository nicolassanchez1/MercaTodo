from django.urls import path
from .views import ProductsView

urlpatterns = [
    path('products/', ProductsView.as_view(), name='products_list'),
    path('products/<int:prod_id>', ProductsView.as_view(), name='product'),
]