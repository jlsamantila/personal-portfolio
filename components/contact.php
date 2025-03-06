<section id="contact" class="section contact">
    <h2>Get in Touch</h2>
    <div class="contact-content">
        <form id="contact-form" action="includes/process-contact.php" method="POST">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit" class="submit-button">Send Message</button>
        </form>
    </div>
</section>