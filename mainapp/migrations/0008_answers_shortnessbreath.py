# Generated by Django 3.1.1 on 2020-09-19 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0007_reading_created_on'),
    ]

    operations = [
        migrations.AddField(
            model_name='answers',
            name='shortnessbreath',
            field=models.CharField(default='yes', max_length=10),
            preserve_default=False,
        ),
    ]
