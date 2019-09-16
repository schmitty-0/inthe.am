from django.db import models


class TaskStoreStatistic(models.Model):
    MEASURE_SIZE = 'size'

    MEASURE_CHOICES = (
        (MEASURE_SIZE, 'Repository Size', ),
    )

    store = models.ForeignKey('TaskStore', related_name='statistics')

    measure = models.CharField(choices=MEASURE_CHOICES, max_length=50)
    value = models.FloatField()

    run_id = models.CharField(
        max_length=255,
        help_text=(
            "If generated by an automated process, indicates the "
            "job name used for generating this value."
        )
    )

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return u"{value} {measure} for {store} at {date}".format(
            value=self.value,
            measure=self.measure,
            store=self.store,
            date=self.created,
        )
