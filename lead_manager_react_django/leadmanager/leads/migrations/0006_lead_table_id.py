# Generated by Django 2.2.7 on 2019-12-04 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0005_lead_topic'),
    ]

    operations = [
        migrations.AddField(
            model_name='lead',
            name='table_id',
            field=models.IntegerField(default=0),
        ),
    ]
