# Generated by Django 5.2 on 2025-04-19 00:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('comments', models.TextField(blank=True, null=True)),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='expenses_added', to='accounts.user')),
                ('group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='expenses', to='accounts.expensegroup')),
            ],
        ),
        migrations.CreateModel(
            name='SplitRelationship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('expense', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='splits', to='main.expense')),
                ('owed', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owed_expenses', to='accounts.user')),
                ('owes', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owes_expenses', to='accounts.user')),
            ],
            options={
                'unique_together': {('expense', 'owes', 'owed')},
            },
        ),
        migrations.AddField(
            model_name='expense',
            name='split_among',
            field=models.ManyToManyField(related_name='expenses_shared', through='main.SplitRelationship', through_fields=('expense', 'owes'), to='accounts.user'),
        ),
    ]
