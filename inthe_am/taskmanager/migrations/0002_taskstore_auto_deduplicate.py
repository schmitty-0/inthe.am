from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("taskmanager", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="taskstore",
            name="auto_deduplicate",
            field=models.BooleanField(default=False),
        ),
    ]
