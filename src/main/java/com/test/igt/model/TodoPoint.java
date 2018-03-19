package com.test.igt.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="TODO_POINT")
public class TodoPoint implements Serializable{

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	@Column(name="TITLE", nullable=false)
	private String title;

	@Column(name="COMPLETED", nullable=false)
	private boolean completed;

	@Column(name="ARCHIVED", nullable=false)
	private boolean archived;

	public Long getId() {
		return id;
	}

	public TodoPoint setId(Long id) {
		this.id = id;
		return this;
	}

	public String getTitle() {
		return title;
	}

	public TodoPoint setTitle(String title) {
		this.title = title;
		return this;
	}

	public boolean isCompleted() {
		return completed;
	}

	public TodoPoint setCompleted(boolean completed) {
		this.completed = completed;
		return this;
	}

	public boolean isArchived() {
		return archived;
	}

	public TodoPoint setArchived(boolean archived) {
		this.archived = archived;
		return this;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (archived ? 1231 : 1237);
		result = prime * result + (completed ? 1231 : 1237);
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((title == null) ? 0 : title.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TodoPoint other = (TodoPoint) obj;
		if (archived != other.archived)
			return false;
		if (completed != other.completed)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "TodoPoint [id=" + id + ", title=" + title + ", completed=" + completed + ", archived=" + archived + "]";
	}
}
