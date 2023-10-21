# Generated by Django 4.1.4 on 2023-07-31 17:28

from django.db import migrations, models
import store.models
import store.validators


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_alter_product_inventory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimage',
            name='image',
            field=models.ImageField(upload_to=store.models.UniqueFilename('store/images'), validators=[store.validators.validate_file_size]),
        ),
    ]
