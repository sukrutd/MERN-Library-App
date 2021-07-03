const mongoose = require('mongoose');
const slugify = require('slugify');

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Please provide a title.'],
            maxlength: [50, "Title can't be more than 50 characters."]
        },
        subtitle: {
            type: String,
            trim: true,
            required: [true, 'Please provide a subtitle.'],
            maxlength: [50, "Subtitle can't be more than 50 characters."]
        },
        description: {
            type: String,
            required: [true, 'Please provide a book description.']
        },
        slug: String,
        published: {
            type: Boolean,
            default: false
        },
        author: {
            type: String,
            required: [true, 'Please provide an author name.'],
            trim: true
        },
        isbn: {
            type: String,
            trim: true,
            required: [true, 'Please provide an ISBN number.'],
            maxlength: [13, "ISBN number can't be more than 13 characters"]
        }
    },
    {
        timestamps: true
    }
);

BookSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model('Book', BookSchema);
