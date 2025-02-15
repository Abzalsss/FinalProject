document.addEventListener("DOMContentLoaded", () => {
    const blogList = document.getElementById("blog-list");
    const blogForm = document.getElementById("blog-form");

    const fetchBlogs = async () => {
        blogList.innerHTML = "<p>Loading...</p>";
        try {
            const res = await fetch("http://localhost:5000/blogs");
            const blogs = await res.json();
            blogList.innerHTML = blogs.map(blog => `
                <div class="blog-item">
                    <h3>${blog.title}</h3>
                    <p>${blog.body}</p>
                    <small>Author: ${blog.author || "Anonymous"}</small>
                    <button class="edit-btn" data-id="${blog._id}">Edit</button>
                    <button class="delete-btn" data-id="${blog._id}">Delete</button>
                </div>
            `).join("");

            // Назначаем события на кнопки
            document.querySelectorAll(".delete-btn").forEach(btn => 
                btn.addEventListener("click", () => deleteBlog(btn.dataset.id))
            );
            document.querySelectorAll(".edit-btn").forEach(btn => 
                btn.addEventListener("click", () => updateBlog(btn.dataset.id))
            );
        } catch (error) {
            blogList.innerHTML = `<p style="color: red;">Error: ${error.message + "sda"}</p>`;
        }
    };

    const addBlog = async (event) => {
        event.preventDefault();
        const title = blogForm.title.value.trim();
        const body = blogForm.body.value.trim();
        const author = blogForm.author.value.trim() || "Anonymous";

        if (!title || !body) return alert("Enter your blog title and content!");

        try {
            await fetch("http://localhost:5000/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, body, author })
            });
            alert("Blog added successfully!");
            blogForm.reset();
            fetchBlogs(); // Перезагружаем список
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const deleteBlog = async (id) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        try {
            await fetch(`http://localhost:5000/blogs/${id}`, { method: "DELETE" });
            fetchBlogs();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const updateBlog = async (id) => {
        const newTitle = prompt("Enter new title:");
        const newBody = prompt("Enter new content:");
        if (!newTitle || !newBody) return alert("Title and content are required!");

        try {
            await fetch(`http://localhost:5000/blogs/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle, body: newBody })
            });
            alert("Blog updated successfully!");
            fetchBlogs(); // Перезагружаем список
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    blogForm.addEventListener("submit", addBlog);
    fetchBlogs(); // Вызываем только после объявления всех функций!
});
