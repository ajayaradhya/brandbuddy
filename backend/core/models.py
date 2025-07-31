from django.db import models

class Brand(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('archived', 'Archived'),
    )

    name = models.CharField(max_length=255, unique=True)
    website = models.URLField(blank=True, null=True)
    instagram_handle = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)  # Travel, Fashion, etc.
    description = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to='brand_logos/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Collaboration(models.Model):
    class Platform(models.TextChoices):
        INSTAGRAM = 'instagram', 'Instagram'
        YOUTUBE = 'youtube', 'YouTube'
        BOTH = 'both', 'Both'
        OTHER = 'other', 'Other'

    class CollabType(models.TextChoices):
        PAID = 'paid', 'Paid'
        BARTER = 'barter', 'Barter'
        GIFTING = 'gifting', 'Gifting'
        AFFILIATE = 'affiliate', 'Affiliate'

    class Status(models.TextChoices):
        CONTACTED = 'contacted', 'Contacted'
        NO_REPLY = 'no_reply', 'No Reply'
        IN_TALKS = 'in_talks', 'In Talks'
        CONFIRMED = 'confirmed', 'Confirmed'
        DELIVERED = 'delivered', 'Delivered'
        PAID = 'paid', 'Paid'
        CANCELLED = 'cancelled', 'Cancelled'

    # Core
    brand = models.ForeignKey('Brand', on_delete=models.CASCADE, related_name='collaborations')
    campaign_name = models.CharField(max_length=255, blank=True, null=True)
    platform = models.CharField(max_length=20, choices=Platform.choices)
    collab_type = models.CharField(max_length=20, choices=CollabType.choices)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.CONTACTED)

    # Dates
    pitch_date = models.DateField(blank=True, null=True)
    followup_date = models.DateField(blank=True, null=True)
    delivery_deadline = models.DateField(blank=True, null=True)

    # Extended calendar
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    reminder_date = models.DateField(blank=True, null=True)
    payment_due_date = models.DateField(blank=True, null=True)
    payment_received_date = models.DateField(blank=True, null=True)

    # Content & Value
    deliverables = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    currency = models.CharField(max_length=10, default='INR')  # New: in case of USD, etc.

    barter_product = models.CharField(max_length=255, blank=True, null=True)
    barter_value = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    # Meta
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # Useful for tracking sync or edits

    def __str__(self):
        return f"{self.brand.name} | {self.campaign_name or 'Unnamed'} | {self.collab_type.capitalize()} [{self.status.replace('_', ' ').title()}]"

